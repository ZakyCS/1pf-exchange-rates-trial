package dev.dolensky.backend.service;

import dev.dolensky.backend.data.ExchangeRate;
import dev.dolensky.backend.data.ExchangeRateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor(onConstructor_ = @Autowired)
@Service
public class ExternalExchangeRateService {
    private static final String WEB_API_URL = "https://webapi.developers.erstegroup.com/api/csas/public/sandbox/v2/rates/exchangerates";

    private final ExchangeRateRepository repository;
    private final RestTemplate restTemplate;

    private final String apiKey = Optional.ofNullable(System.getenv("WEB_API_KEY"))
            .or(() -> Optional.ofNullable(System.getProperty("WEB_API_KEY")))
            .orElseThrow(() -> new IllegalStateException("WEB_API_KEY environment variable is not set"));

    @Cacheable("exchangeRates")
    public List<ExchangeRate> getExternalExchangeRates() {
        String url = WEB_API_URL + "?web-api-key=" + apiKey;
        ExchangeRate[] fetchedRates = restTemplate.getForObject(url, ExchangeRate[].class);

        if (fetchedRates == null || fetchedRates.length == 0) {
            return List.of();
        }

        LocalDateTime now = LocalDateTime.now();

        List<String> shortNames = Arrays.stream(fetchedRates)
                .map(ExchangeRate::getShortName)
                .distinct()
                .toList();

        List<Integer> versions = Arrays.stream(fetchedRates)
                .map(ExchangeRate::getVersion)
                .distinct()
                .toList();

        List<ExchangeRate> existingRates = repository.findAllByShortNameInAndVersionIn(shortNames, versions);

        Map<String, ExchangeRate> existingMap = existingRates.stream()
                .collect(Collectors.toMap(
                        exchangeRate -> exchangeRate.getShortName() + ":" + exchangeRate.getVersion(),
                        exchangeRate -> exchangeRate
                ));

        List<ExchangeRate> toSave = Arrays.stream(fetchedRates)
                .peek(exchangeRate -> exchangeRate.setLastUpdated(now))
                .map(fetched -> {
                    String key = fetched.getShortName() + ":" + fetched.getVersion();
                    ExchangeRate existing = existingMap.get(key);
                    if (existing != null) {
                        BeanUtils.copyProperties(fetched, existing, "id");
                        return existing;
                    } else {
                        return fetched;
                    }
                })
                .toList();

        return repository.saveAll(toSave);
    }
}

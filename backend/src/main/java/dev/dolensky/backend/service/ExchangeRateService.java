package dev.dolensky.backend.service;

import dev.dolensky.backend.data.ExchangeRate;
import dev.dolensky.backend.data.ExchangeRateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor(onConstructor_ = @Autowired)
@Service
public class ExchangeRateService {
    private final ExchangeRateRepository repository;
    private final ExternalExchangeRateService externalExchangeRateService;

    public List<ExchangeRate> getExchangeRates(boolean useDb) {
        if (useDb) {
            List<ExchangeRate> dbLatest = repository.findDbLatest();
            return dbLatest.isEmpty() ? getExchangeRates(false) : dbLatest;
        }

        return externalExchangeRateService.getExternalExchangeRates();
    }
}
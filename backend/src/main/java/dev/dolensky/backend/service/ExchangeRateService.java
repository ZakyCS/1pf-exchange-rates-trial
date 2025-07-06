package dev.dolensky.backend.service;

import dev.dolensky.backend.data.ExchangeRate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor(onConstructor_ = @Autowired)
@Service
public class ExchangeRateService {
    private final ExternalExchangeRateService externalExchangeRateService;
    private final DatabaseExchangeRateService databaseExchangeRateService;

    public List<ExchangeRate> getExchangeRates(boolean useDb) {
        if (useDb) {
            return databaseExchangeRateService.getDatabaseExchangeRates();
        }

        return externalExchangeRateService.getExternalExchangeRates();
    }
}
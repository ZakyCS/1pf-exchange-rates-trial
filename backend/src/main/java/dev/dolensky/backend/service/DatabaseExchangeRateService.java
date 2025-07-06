    package dev.dolensky.backend.service;

    import dev.dolensky.backend.data.ExchangeRate;
    import dev.dolensky.backend.data.ExchangeRateRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.cache.annotation.Cacheable;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @RequiredArgsConstructor(onConstructor_ = @Autowired)
    @Service
    public class DatabaseExchangeRateService {
        private final ExternalExchangeRateService externalExchangeRateService;
        private final ExchangeRateRepository repository;

        @Cacheable(value = "exchangeRatesDb")
        public List<ExchangeRate> getDatabaseExchangeRates() {
            List<ExchangeRate> dbLatest = repository.findDbLatest();
            return dbLatest.isEmpty() ? externalExchangeRateService.getExternalExchangeRates() : dbLatest;
        }
    }

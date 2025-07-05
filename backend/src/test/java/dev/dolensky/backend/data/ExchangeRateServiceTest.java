package dev.dolensky.backend.data;

import dev.dolensky.backend.service.ExchangeRateService;
import dev.dolensky.backend.service.ExternalExchangeRateService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.List;

public class ExchangeRateServiceTest {
    @Mock
    private ExchangeRateRepository repository;

    @Mock
    private ExternalExchangeRateService externalExchangeRateService;

    @InjectMocks
    private ExchangeRateService service;

    private AutoCloseable mocks;


    @BeforeEach
    void setUp() {
        mocks = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        mocks.close();
    }

    @Test
    void testGetExchangeRates_useDbTrue_returnsDbLatest() {
        ExchangeRate rate = new ExchangeRate();
        Mockito.when(repository.findDbLatest()).thenReturn(List.of(rate));

        List<ExchangeRate> result = service.getExchangeRates(true);

        Assertions.assertEquals(1, result.size());
        Mockito.verify(repository, Mockito.times(1)).findDbLatest();
        Mockito.verifyNoMoreInteractions(externalExchangeRateService);
    }

    @Test
    void testGetExchangeRates_useDbTrue_emptyDb_callsExternal() {
        Mockito.when(repository.findDbLatest()).thenReturn(List.of());
        Mockito.when(externalExchangeRateService.getExternalExchangeRates()).thenReturn(List.of(new ExchangeRate()));

        List<ExchangeRate> result = service.getExchangeRates(true);

        Assertions.assertEquals(1, result.size());
        Mockito.verify(repository, Mockito.times(1)).findDbLatest();
        Mockito.verify(externalExchangeRateService, Mockito.times(1)).getExternalExchangeRates();
    }

    @Test
    void testGetExchangeRates_useDbFalse_callsExternal() {
        Mockito.when(externalExchangeRateService.getExternalExchangeRates()).thenReturn(List.of(new ExchangeRate()));

        List<ExchangeRate> result = service.getExchangeRates(false);

        Assertions.assertEquals(1, result.size());
        Mockito.verifyNoInteractions(repository);
        Mockito.verify(externalExchangeRateService, Mockito.times(1)).getExternalExchangeRates();
    }
}

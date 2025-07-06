package dev.dolensky.backend.data;

import dev.dolensky.backend.service.ExternalExchangeRateService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class ExternalExchangeRateServiceTest {

    @Mock
    private ExchangeRateRepository repository;

    @Mock
    private RestTemplate restTemplate;

    private ExternalExchangeRateService service;

    private AutoCloseable mocks;

    @BeforeEach
    void setUp() {
        System.setProperty("WEB_API_KEY", "dummy-api-key");

        mocks = MockitoAnnotations.openMocks(this);
        service = new ExternalExchangeRateService(repository, restTemplate);
    }

    @AfterEach
    void tearDown() throws Exception {
        mocks.close();
        System.clearProperty("WEB_API_KEY");
    }

    @Test
    void testGetExternalExchangeRates_returnsSavedRates() {
        ExchangeRate fetchedRate = new ExchangeRate();
        fetchedRate.setShortName("USD");
        fetchedRate.setVersion(1);

        ExchangeRate existingRate = new ExchangeRate();
        existingRate.setShortName("USD");
        existingRate.setVersion(1);
        existingRate.setId(123L);

        Mockito.when(restTemplate.getForObject(Mockito.anyString(), Mockito.eq(ExchangeRate[].class))).thenReturn(new ExchangeRate[]{fetchedRate});
        Mockito.when(repository.findAllByShortNameInAndVersionIn(List.of("USD"), List.of(1))).thenReturn(List.of(existingRate));
        Mockito.when(repository.saveAll(Mockito.anyList())).thenAnswer(invocation -> invocation.getArgument(0));

        List<ExchangeRate> result = service.getExternalExchangeRates();

        Assertions.assertEquals(1, result.size());
        Mockito.verify(repository).findAllByShortNameInAndVersionIn(List.of("USD"), List.of(1));
        Mockito.verify(repository).saveAll(Mockito.anyList());
    }

    @Test
    void testGetExternalExchangeRates_noFetchedRates_returnsEmptyList() {
        Mockito.when(restTemplate.getForObject(Mockito.anyString(), Mockito.eq(ExchangeRate[].class))).thenReturn(null);

        List<ExchangeRate> result = service.getExternalExchangeRates();

        Assertions.assertTrue(result.isEmpty());
        Mockito.verifyNoInteractions(repository);
    }

    @Test
    void testGetExternalExchangeRates_fetchedRateIsNew_savesIt() {
        ExchangeRate fetchedRate = new ExchangeRate();
        fetchedRate.setShortName("EUR");
        fetchedRate.setVersion(2);

        Mockito.when(restTemplate.getForObject(Mockito.anyString(), Mockito.eq(ExchangeRate[].class))).thenReturn(new ExchangeRate[]{fetchedRate});
        Mockito.when(repository.findAllByShortNameInAndVersionIn(List.of("EUR"), List.of(2))).thenReturn(List.of());
        Mockito.when(repository.saveAll(Mockito.anyList())).thenAnswer(invocation -> invocation.getArgument(0));

        List<ExchangeRate> result = service.getExternalExchangeRates();

        Assertions.assertEquals(1, result.size());
        Mockito.verify(repository).saveAll(Mockito.anyList());
    }

    @Test
    void testMissingApiKey_throwsException() {
        System.clearProperty("WEB_API_KEY");
        Assertions.assertThrows(IllegalStateException.class, () -> new ExternalExchangeRateService(repository, restTemplate));
    }
}

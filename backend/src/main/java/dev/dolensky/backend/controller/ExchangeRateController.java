package dev.dolensky.backend.controller;

import dev.dolensky.backend.data.ExchangeRate;
import dev.dolensky.backend.service.ExchangeRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor(onConstructor_ = @Autowired)
@RestController
@RequestMapping("/api/exchange-rates")
public class ExchangeRateController {
    private final ExchangeRateService service;

    @GetMapping
    public List<ExchangeRate> getExchangeRates(@RequestParam(defaultValue = "true") boolean usedb) {
        return service.getExchangeRates(usedb);
    }
}

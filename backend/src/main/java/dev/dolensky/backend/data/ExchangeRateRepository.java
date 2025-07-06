package dev.dolensky.backend.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Long> {
    List<ExchangeRate> findAllByShortNameInAndVersionIn(List<String> shortNames, List<Integer> versions);

    @Query(value = """
        SELECT entity.* FROM exchange_rates entity
        JOIN (
            SELECT short_name, MAX(version) AS max_version
            FROM exchange_rates
            GROUP BY short_name
        ) latest
        ON entity.short_name = latest.short_name AND entity.version = latest.max_version
    """, nativeQuery = true)
    List<ExchangeRate> findDbLatest();
}

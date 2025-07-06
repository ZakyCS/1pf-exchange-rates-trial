package dev.dolensky.backend.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "exchange_rates", uniqueConstraints = @UniqueConstraint(columnNames = {"short_name", "version"}))
public class ExchangeRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Column(name = "short_name")
    private String shortName;

    @Column(name = "valid_from")
    private String validFrom;

    private String name;
    private String country;
    private double move;
    private int amount;

    @Column(name = "val_buy")
    private double valBuy;

    @Column(name = "val_sell")
    private double valSell;

    @Column(name = "val_mid")
    private double valMid;

    @Column(name = "curr_buy")
    private double currBuy;

    @Column(name = "curr_sell")
    private double currSell;

    @Column(name = "curr_mid")
    private double currMid;

    private int version;

    @Column(name = "cnb_mid")
    private double cnbMid;

    @Column(name = "ecb_mid")
    private double ecbMid;

    @JsonIgnore
    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
}

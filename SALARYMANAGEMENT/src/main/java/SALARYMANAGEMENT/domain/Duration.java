package SALARYMANAGEMENT.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.HashSet;
import java.util.Set;


@Entity
@Data
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"month", "year"} )
        })
@AllArgsConstructor
@NoArgsConstructor
public class Duration {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private byte month;

    @Column(nullable = false)
    private int year;

    @JsonBackReference
    @OneToMany(mappedBy = "duration")
    Set<Payroll> payrolls ;

    public Duration (Long id, byte month, int year){
        this.id = id;
        this.month = month;
        this.year = year;
    }
}

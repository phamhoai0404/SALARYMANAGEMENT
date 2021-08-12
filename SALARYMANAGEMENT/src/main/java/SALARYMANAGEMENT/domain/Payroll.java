package SALARYMANAGEMENT.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;


@Data
@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"staff_id", "duration_id"} )
        })
@AllArgsConstructor
@NoArgsConstructor
public class Payroll {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "staff_id")

    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "duration_id")
    private  Duration duration;

    @Column(nullable = false)
    private byte workDay;

    @Column()
    private float bonus;

}

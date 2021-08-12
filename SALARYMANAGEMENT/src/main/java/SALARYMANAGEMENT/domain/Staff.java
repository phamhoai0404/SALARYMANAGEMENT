package SALARYMANAGEMENT.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "staff_id" )
        })
@AllArgsConstructor
@NoArgsConstructor
public class Staff {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Size(min = 3, max = 10)
    @Column(name = "staff_id" , nullable = false)
    private String staffId;

    @Size(min = 3, max = 255)
    @Column(nullable = false)
    private String fullName;

    @Size(min = 3, max = 255)
    @Column(nullable = false)
    private String position;

    @Size(min = 3, max = 255)
    @Column()
    private String gender;

    @Temporal(TemporalType.DATE)
    @Column()
    private Date birthday;

    @Size(min = 3, max = 255)
    @Column()
    private String address;

    @Lob
    @Column()
    private String staffDescribe;

    @Column(nullable = false)
    private float basicSalary;

    @JsonBackReference
    @OneToMany(mappedBy = "staff")
    Set<Payroll> payrolls ;

}

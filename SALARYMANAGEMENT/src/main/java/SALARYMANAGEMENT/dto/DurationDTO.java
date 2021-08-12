package SALARYMANAGEMENT.dto;

import SALARYMANAGEMENT.domain.Payroll;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DurationDTO {

    private Long id;

    private byte month;

    private int year;

}

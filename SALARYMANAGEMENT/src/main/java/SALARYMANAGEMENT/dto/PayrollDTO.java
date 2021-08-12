package SALARYMANAGEMENT.dto;

import SALARYMANAGEMENT.domain.Duration;
import SALARYMANAGEMENT.domain.Staff;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayrollDTO {
    private Long id;

    private Staff staff;

    private Duration duration;

    private byte workDay;

    private float bonus;
}

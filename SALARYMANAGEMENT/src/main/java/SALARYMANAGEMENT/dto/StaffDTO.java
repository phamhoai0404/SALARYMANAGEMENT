package SALARYMANAGEMENT.dto;


import SALARYMANAGEMENT.domain.Payroll;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffDTO {

    private Long id;

    private String staffId;

    private String fullName;

    private String position;

    private String gender;

    private Date birthday;

    private String address;

    private String staffDescribe;

    private float basicSalary;


}

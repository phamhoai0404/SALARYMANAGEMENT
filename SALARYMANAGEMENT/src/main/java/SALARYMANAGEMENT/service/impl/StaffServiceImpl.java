package SALARYMANAGEMENT.service.impl;

import SALARYMANAGEMENT.domain.Payroll;
import SALARYMANAGEMENT.domain.Staff;
import SALARYMANAGEMENT.dto.PayrollDTO;
import SALARYMANAGEMENT.dto.StaffDTO;
import SALARYMANAGEMENT.repository.StaffRepository;
import SALARYMANAGEMENT.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    StaffRepository staffRepository;

    @Override
    public List<StaffDTO> getAllStaff() {
        return this.staffRepository.findAll().stream().map( s -> this.toDTO(s)).collect(Collectors.toList());
    }
    private StaffDTO toDTO (Staff staff){
        return new StaffDTO(staff.getId(),staff.getStaffId(), staff.getFullName(), staff.getPosition(),
                staff.getGender(), staff.getBirthday(), staff.getAddress(),
                staff.getStaffDescribe(), staff.getBasicSalary());
    }
}

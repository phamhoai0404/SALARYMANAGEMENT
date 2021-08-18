package SALARYMANAGEMENT.service;

import SALARYMANAGEMENT.domain.Payroll;
import SALARYMANAGEMENT.dto.PayrollDTO;
import SALARYMANAGEMENT.dto.StaffDTO;

import java.util.List;

public interface PayrollService {
    boolean existsById(Long id);

    List<PayrollDTO> getAllPayroll();

    PayrollDTO editPayroll( Long id ,PayrollDTO dto) throws Exception;

    PayrollDTO addPayroll( PayrollDTO dto) throws Exception;

    PayrollDTO deletePayroll(Long id) throws Exception;

    List<StaffDTO> searchStaffNotExistsDuration(Long idDuration);

    List<PayrollDTO> searchByDuration( Long idDuration);
}

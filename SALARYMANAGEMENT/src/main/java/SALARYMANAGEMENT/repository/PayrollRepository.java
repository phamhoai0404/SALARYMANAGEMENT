package SALARYMANAGEMENT.repository;

import SALARYMANAGEMENT.domain.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll,Long> {
    List<Payroll> findByDuration_Id(Long id);

}

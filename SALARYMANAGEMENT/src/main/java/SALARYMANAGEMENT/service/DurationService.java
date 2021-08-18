package SALARYMANAGEMENT.service;

import SALARYMANAGEMENT.domain.Duration;
import SALARYMANAGEMENT.dto.DurationDTO;

import java.util.List;

public interface DurationService {

    List<DurationDTO> getAllDuration();

    DurationDTO addDuration(DurationDTO duration) throws  Exception;

}

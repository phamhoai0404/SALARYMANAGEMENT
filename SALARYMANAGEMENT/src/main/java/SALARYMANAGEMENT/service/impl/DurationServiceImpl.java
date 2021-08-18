package SALARYMANAGEMENT.service.impl;

import SALARYMANAGEMENT.domain.Duration;
import SALARYMANAGEMENT.dto.DurationDTO;
import SALARYMANAGEMENT.repository.DurationRepository;
import SALARYMANAGEMENT.service.DurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DurationServiceImpl implements DurationService {

    @Autowired
    DurationRepository durationRepository;


    @Override
    public List<DurationDTO> getAllDuration() {
        return durationRepository.findAll().stream().map(s -> this.toDTO(s)).collect(Collectors.toList());
    }

    @Override
    public DurationDTO addDuration(DurationDTO duration) throws Exception {
        if( duration.getId() != null){
            throw new Exception();
        }
        return this.toDTO(durationRepository.save(this.toEntity(duration)));
    }


    private DurationDTO toDTO (Duration duration){
        return new DurationDTO(duration.getId(), duration.getMonth(), duration.getYear());
    }
    private  Duration toEntity(DurationDTO dto){
        return new Duration(dto.getId(), dto.getMonth(), dto.getYear());
    }
}

package SALARYMANAGEMENT.controller;

import SALARYMANAGEMENT.domain.Duration;
import SALARYMANAGEMENT.dto.DurationDTO;
import SALARYMANAGEMENT.service.DurationService;
import SALARYMANAGEMENT.service.impl.DurationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/duration")
public class DurationController {

    @Autowired
    DurationService durationService;

    @GetMapping("/find")
    public ResponseEntity<?> getAllDuration() {
        try {
            return ResponseEntity.ok(durationService.getAllDuration());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/add")
    public ResponseEntity<?> addDuration(@RequestBody @Valid DurationDTO dto){
        try {
            System.out.println("đã vào");
            return ResponseEntity.ok(durationService.addDuration(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

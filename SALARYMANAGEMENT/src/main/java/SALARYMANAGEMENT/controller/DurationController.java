package SALARYMANAGEMENT.controller;

import SALARYMANAGEMENT.service.DurationService;
import SALARYMANAGEMENT.service.impl.DurationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/duration")
public class DurationController {

    @Autowired
    DurationService durationService;

    @GetMapping("/find")
    public ResponseEntity<?> getAllPayroll() {
        try {
            return ResponseEntity.ok(durationService.getAllDuration());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

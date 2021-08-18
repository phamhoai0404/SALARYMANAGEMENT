package SALARYMANAGEMENT.controller;

import SALARYMANAGEMENT.dto.PayrollDTO;
import SALARYMANAGEMENT.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    PayrollService payrollService;

    @GetMapping("/find")
    public ResponseEntity<?> getAllPayroll() {
        try {
            return ResponseEntity.ok(payrollService.getAllPayroll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/")
    public String getAll(){
        return "hoa anh dao";
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPayroll(@RequestBody @Valid PayrollDTO dto) {
        try {
            return ResponseEntity.ok(payrollService.addPayroll(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping ("/edit/{id}")
    public ResponseEntity<?> editPayroll(@PathVariable Long id, @RequestBody @Valid PayrollDTO dto) {
        try {
            System.out.println("đã vào đây");
            return ResponseEntity.ok(payrollService.editPayroll(id,dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping ("/delete/{id}")
    public ResponseEntity<?> deletePayroll(@PathVariable Long id){
        try {
            return ResponseEntity.ok(payrollService.deletePayroll(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/find/{idDuration}")
    public ResponseEntity<?> findStaffNotDuration(@PathVariable Long idDuration){
        try{
            return ResponseEntity.ok(payrollService.searchStaffNotExistsDuration(idDuration));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/get/{idDuration}")
    public ResponseEntity<?> searchPayrollByDuration(@PathVariable Long idDuration){
        try{
            return ResponseEntity.ok(payrollService.searchByDuration(idDuration));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

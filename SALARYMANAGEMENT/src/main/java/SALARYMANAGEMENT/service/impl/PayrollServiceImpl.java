package SALARYMANAGEMENT.service.impl;

import SALARYMANAGEMENT.domain.Payroll;
import SALARYMANAGEMENT.dto.PayrollDTO;
import SALARYMANAGEMENT.dto.StaffDTO;
import SALARYMANAGEMENT.repository.DurationRepository;
import SALARYMANAGEMENT.repository.PayrollRepository;
import SALARYMANAGEMENT.service.PayrollService;
import SALARYMANAGEMENT.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@Service
public class PayrollServiceImpl implements PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private StaffService staffService;


    @Override
    public boolean existsById(Long id) {
        return payrollRepository.existsById(id);
    }

    @Override
    public List<PayrollDTO> getAllPayroll() {
        return payrollRepository.findAll().stream().map(s -> this.toDTO(s)).collect(Collectors.toList());
    }

    @Override
    public PayrollDTO editPayroll(Long id ,PayrollDTO dto) throws Exception{

        //Nếu không tồn tại id thì trả về Exception()
        if( !this.existsById(id)) {
            throw new Exception();
        }

        //Cho dữ liệu payroll bằng chỉ update lại tiền lương  và ngày làm việc
        //Phòng trường hợp PayrollDTO truyền cả về cả nhân viên, Tháng năm
        Payroll payrollTemporary = payrollRepository.findById(id).orElseThrow(null);

        Payroll payroll = new Payroll();
        payroll.setDuration(payrollTemporary.getDuration());
        payroll.setStaff(payrollTemporary.getStaff());
        payroll.setBonus(dto.getBonus());
        payroll.setWorkDay(dto.getWorkDay());

        payroll.setId(id);//Thiết lập id bằng chính cái truyền vào đấy

        return this.toDTO(payrollRepository.save(payroll)) ;
    }

    @Override
    public PayrollDTO addPayroll(PayrollDTO dto) throws Exception {
        if(dto.getId() != null){
            throw  new Exception();
        }
        return this.toDTO(payrollRepository.save(this.toEntity(dto)));
    }

    @Override
    public PayrollDTO deletePayroll(Long id ) throws Exception {
        if( ! this.existsById(id) ){
            throw new Exception();
        }
        //Tìm kiếm bản ghi đấy để tí trả về
        Payroll payroll = payrollRepository.findById(id).orElse(null);

        //Xóa bản ghi có id
        payrollRepository.deleteById(id);

        return  this.toDTO(payroll);

    }

    @Override
    public List<StaffDTO> searchStaffNotExistsDuration(Long idDuration){

        //Có thể viết như này nhưng viết tắt hay hơn
        //List<Payroll> payrollList = payrollRepository.findByDuration_Id(idDuration);
        List<PayrollDTO> payrollDTOList = payrollRepository.findByDuration_Id(idDuration).stream().map(this:: toDTO).collect(Collectors.toList());

        //Lấy toàn bộ nhân viên
        List<StaffDTO> staff = staffService.getAllStaff();

        List<StaffDTO> notStaff = new CopyOnWriteArrayList<>();

        //Nhân viên không tồn tại trong duration
        staff.forEach(item ->{
            if( ! this.existDuration(item.getId(), payrollDTOList)){
                notStaff.add(item);
            }
        });


        return  notStaff;
    }

    @Override
    public List<PayrollDTO> searchByDuration(Long idDuration) {
        List<PayrollDTO> payrollDTOList = payrollRepository.findByDuration_Id(idDuration).stream().map(this:: toDTO).collect(Collectors.toList());
        return payrollDTOList;
    }

    /**
     *
     * @param iddd - id của nhân viên cần kiểm tra
     * @param payrollDTOList - danh sách lương
     * @return Tồn tại rồi thì trả về true
     *      * Chưa tồn tại thì trả về false
     */
    private Boolean existDuration( Long iddd, List<PayrollDTO> payrollDTOList ){
        //Nếu nó tồn tại thì kiểm tra
        if( payrollDTOList != null){
            for( int i = 0 ; i< payrollDTOList.size(); i++) {
                if (payrollDTOList.get(i).getStaff().getId() == iddd) {
                    return true;//Nếu mà bằng nhau thì kết thúc luôn trả về true là có nằm trong payroll
                }
            }
        }
        //Nếu không tồn tại thì trả về false
        return false;

    }



    private PayrollDTO toDTO (Payroll payroll){
        return new PayrollDTO(payroll.getId(),payroll.getStaff(),payroll.getDuration(), payroll.getWorkDay(),payroll.getBonus());
    }
    private  Payroll toEntity(PayrollDTO dto){
        return new Payroll(dto.getId(),dto.getStaff(),dto.getDuration(), dto.getWorkDay(),dto.getBonus());
    }

}

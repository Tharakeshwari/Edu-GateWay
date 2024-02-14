package com.example.edugateway_app.controller;

import com.example.edugateway_app.entity.Admission;
import com.example.edugateway_app.entity.Courses;
import com.example.edugateway_app.entity.Payment;
import com.example.edugateway_app.entity.Student;
import com.example.edugateway_app.service.AdmissionService;
import com.example.edugateway_app.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    @Autowired
    private AdmissionService admissionService;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{paymentId}")
    public Payment getPaymentById(@PathVariable Long paymentId) {
        return paymentService.getPaymentById(paymentId);
    }

    // @PostMapping
    // public Payment createPayment(@RequestBody Payment payment) {
    //     return paymentService.createPayment(payment);
    // }

    @PutMapping("/{paymentId}")
    public Payment updatePaymentById(@PathVariable Long paymentId, @RequestBody Payment payment) {
        return paymentService.updatePaymentById(paymentId, payment);
    }

    @DeleteMapping("/{paymentId}")
    public boolean deletePaymentById(@PathVariable Long paymentId) {
        return paymentService.deletePaymentById(paymentId);
    }
    @PostMapping
    public Payment createPayment(@RequestParam(value = "admissionId", required = false) Long admissionId,
                                     @RequestBody Payment payment) {
        if (admissionId != null) {
            Admission admission = admissionService.getAdmissionById(admissionId);
            if (admission != null) {
                payment.setAdmission(admission);
            } else {
                // Handle case where studentId does not correspond to any student
                // You can throw an exception or return an appropriate response
            }
        }

        return paymentService.createPayment(payment);
    }

}

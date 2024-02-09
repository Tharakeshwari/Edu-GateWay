package com.example.edugateway_app.service;

import com.example.edugateway_app.entity.Payment;
import com.example.edugateway_app.repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepo paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long paymentId) {
        Optional<Payment> paymentOptional = paymentRepository.findById(paymentId);
        return paymentOptional.orElse(null);
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePaymentById(Long paymentId, Payment updatedPayment) {
        if (paymentRepository.existsById(paymentId)) {
            updatedPayment.setPaymentId(paymentId);
            return paymentRepository.save(updatedPayment);
        }
        return null;
    }

    public boolean deletePaymentById(Long paymentId) {
        paymentRepository.deleteById(paymentId);
        return true;
    }
}

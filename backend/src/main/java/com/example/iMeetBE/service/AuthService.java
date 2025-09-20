package com.example.iMeetBE.service;

import com.example.iMeetBE.dto.LoginRequest;
import com.example.iMeetBE.dto.LoginResponse;
import com.example.iMeetBE.dto.SignupRequest;
import com.example.iMeetBE.dto.SignupResponse;
import com.example.iMeetBE.model.User;
import com.example.iMeetBE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            // Tìm user theo email
            Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
            
            if (userOptional.isEmpty()) {
                return new LoginResponse(false, "Email không tồn tại");
            }

            User user = userOptional.get();
            
            // Kiểm tra password (trong thực tế nên hash password)
            if (!user.getPassword().equals(loginRequest.getPassword())) {
                return new LoginResponse(false, "Mật khẩu không đúng");
            }

            // Tạo token đơn giản (trong thực tế nên dùng JWT)
            String token = "token_" + user.getId() + "_" + System.currentTimeMillis();

            return new LoginResponse(true, "Đăng nhập thành công", token, user.getId(), user.getUsername());
            
        } catch (Exception e) {
            return new LoginResponse(false, "Lỗi hệ thống: " + e.getMessage());
        }
    }

    public SignupResponse signup(SignupRequest signupRequest) {
        try {
            // Kiểm tra email đã tồn tại chưa
            if (userRepository.existsByEmail(signupRequest.getEmail())) {
                return new SignupResponse(false, "Email đã được sử dụng");
            }

            // Kiểm tra username đã tồn tại chưa
            if (userRepository.existsByUsername(signupRequest.getUsername())) {
                return new SignupResponse(false, "Tên người dùng đã được sử dụng");
            }

            // Tạo user mới
            User newUser = new User();
            newUser.setUsername(signupRequest.getUsername());
            newUser.setEmail(signupRequest.getEmail());
            newUser.setPassword(signupRequest.getPassword()); // Trong thực tế nên hash password
            newUser.setFullName(signupRequest.getFullName());
            newUser.setUpdatedAt(LocalDateTime.now());
            // createdAt sẽ được set tự động bởi @PrePersist

            User savedUser = userRepository.save(newUser);

            return new SignupResponse(true, "Đăng ký thành công", savedUser.getId(), savedUser.getUsername(), savedUser.getEmail());

        } catch (Exception e) {
            return new SignupResponse(false, "Lỗi hệ thống: " + e.getMessage());
        }
    }
}

package com.example.userservice.service;

import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.vo.RequestLogin;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {

    public UserDto createUser(UserDto userDto);

    public UserDto getUserByUserId(Long userId);

    public UserDto getUserDetailsByEmail(String email);

    public UserDto checkUserByEmail(RequestLogin requestLogin);

    public UserDto getUser(Long userId);

    public UserDto updateUser(UserDto userDto);

    public void deleteUser(Long userId);

    Iterable<UserEntity> getUserByAll();
}

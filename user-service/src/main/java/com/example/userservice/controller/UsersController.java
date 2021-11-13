package com.example.userservice.controller;

import com.example.userservice.dto.UserDto;
import com.example.userservice.service.UserService;
import com.example.userservice.vo.RequestLogin;
import com.example.userservice.vo.RequestUser;
import com.example.userservice.vo.Response;
import com.example.userservice.vo.ResponseUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;

@RequiredArgsConstructor
@RestController
@RequestMapping("/")
@Slf4j
public class UsersController {

    private final UserService userService;
    private final Environment env;

    @ApiOperation(value="상태 확인", notes="user-service의 상태 확인")
    @GetMapping("/health_check")
    public String status(HttpServletRequest request) {
        log.info("health_check 요청");
        return String.format("It's Working in User Service," +
                "port(local.server.port)=%s, port(server.port)=%s" +
                "token_secret=%s, token_expiration_time=%s, gateway_ip=%s",
                env.getProperty("local.server.port"), env.getProperty("server.port"),
                env.getProperty("token.secret"), env.getProperty("token.expiration_time"), env.getProperty("gateway.ip")
        );
    }

    @ApiOperation(value="회원가입(유저 생성)", notes="user의 정보를 입력하여 유저 생성")
    @PostMapping("/users")
    public ResponseEntity createUser(@RequestBody @Valid RequestUser user){
        log.info("/users post 요청");
        Response response = new Response();
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        UserDto userDto = mapper.map(user, UserDto.class);

        //todo 중복 이메일, 유효성 문제 컬럼 확인 예외 상태코드확인
        try {
            userService.createUser(userDto);
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("회원정보를 확인해주세요.");
        }

        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);
        response.add("user", responseUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
//        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @ApiOperation(value="로그인", notes="로그인")
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid RequestLogin user, HttpServletRequest req){
        log.info("/users post 로그인 요청");
        UserDto userDto = null;

        try{
            userDto = userService.checkUserByEmail(user);
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보를 확인해주세요.");
        }

        // 계정 검사
        String token = Jwts.builder()
                .claim("email", userDto.getEmail())
                .claim("userId", userDto.getUserId())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(env.getProperty("token.expiration_time"))))
                .signWith(SignatureAlgorithm.HS512, env.getProperty("token.secret"))
                .compact();


        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);
        responseUser.setToken(token);


        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
    }

    @ApiOperation(value = "email 중복 확인", notes = "email 중복 확인")
    @PostMapping("/duplicatedEmail")
    public ResponseEntity checkDuplicatedEmail(@RequestBody RequestUser user){
        try{
            userService.getUserDetailsByEmail(user.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이미 가입된 이메일입니다.");
        }catch(Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.OK).body("사용가능한 이메일입니다.");
        }
    }

    @ApiOperation(value="정보 조회", notes = "자신의 정보 조회, 관리자의 경우 전체 회원 목록 조회")
    @GetMapping("/users")
    public ResponseEntity getUser(HttpServletRequest req){

        //todo null 처리 생각해보기, 예외 코드 생각, 예외 처리 중복되면 하나의 메서드로 묶어서 처리
        if(req.getHeader("userid") == null){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("userId가 토큰에 존재하지 않습니다.");
        }

        Long userId = Long.parseLong(req.getHeader("userid"));

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        UserDto userDto = userService.getUser(userId);
        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.OK).body(responseUser);

        /*관리자의 경우
        Iterable<UserEntity> users = userService.getUserByAll();

        List<ResponseUser> responseUsers = new ArrayList<>();
        users.forEach(v -> new ModelMapper().map(v, ResponseUser.class));
        for (Enumeration<String> e = req.getHeaderNames(); e.hasMoreElements();) {
            String name = e.nextElement();
            log.info("{} : {}", name, req.getHeader(name));
        }

        return ResponseEntity.status(HttpStatus.OK).body(responseUsers);
         */
    }

    @ApiOperation(value="내 정보 수정", notes = "자신의 정보 수정")
    @PutMapping("/users")
    public ResponseEntity updateUser(@RequestBody RequestUser user, HttpServletRequest req){

//        if(req.getHeader("userid") == null){
//            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("userId가 토큰에 존재하지 않습니다.");
//        }
//
//        Long userId = Long.parseLong(req.getHeader("userid"));
//
//        //todo 관리자 추가하면 관리자가 아닌 경우 조건문 추가
//        if(userId != user.getUserId()){
//            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(String.format("%d, %d 권한이 없습니다.", userId, user.getUserId()));
//        }

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        UserDto userDto = mapper.map(user, UserDto.class);

        try{
            userService.updateUser(userDto);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.OK).body(responseUser);
    }

    //todo userid가 잇을떄 없을떄 고려 수정필요
    @ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴, 관리자의 경우 userId 파라미터터를 받아 탈퇴 처리")
    @DeleteMapping("/users")
    public ResponseEntity deleteUser(HttpServletRequest req){

        try{
            userService.deleteUser(Long.parseLong(req.getHeader("userid")));
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(String.format("%s가 없습니다.", req.getHeader("userid")));
        }
        return ResponseEntity.status(HttpStatus.OK).body(String.format("%s 삭제 완료", req.getHeader("userid")));

        //todo if(관리자 확인) 후 userid 파라미터로 받아서 삭제하기

    }

}

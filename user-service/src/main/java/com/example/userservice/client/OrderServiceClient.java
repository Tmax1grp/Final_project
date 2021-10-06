//package com.example.userservice.client;
//
//import com.example.userservice.error.FeignErrorDecoder;
//import com.example.userservice.vo.ResponseOrder;
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//
//import java.util.List;
//
////order-service -> 유레카 -> http://127.0.0.1:50002라고 답을 줌, 그럼 http://127.0.0.1:50002/{userId}/orders 직접 호출
//@FeignClient(name = "order-service", configuration = FeignErrorDecoder.class)
//public interface OrderServiceClient {
//
//    @GetMapping(value= "/{userId}/orders")
//    public List<ResponseOrder> getOrder(@PathVariable("userId") String userId);
//}

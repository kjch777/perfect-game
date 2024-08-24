package base.ball.controller;

import java.util.Base64;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;



@RestController
public class AuthorizationController {

    @Value("${apiSecretKey}")
    private String apiSecretKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private String encodeSecretKey(String secretKey) {
        return "Basic " + new String(Base64.getEncoder().encode((secretKey + ":").getBytes()));
    }

    @GetMapping("/callback-auth")
    public ResponseEntity<?> callbackAuth(@RequestParam String customerKey, @RequestParam String code) {
        String url = "https://api.tosspayments.com/v1/brandpay/authorizations/access-token";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", encodeSecretKey(apiSecretKey));
        headers.set("Content-Type", "application/json");

        Map<String, String> requestBody = Map.of(
            "grantType", "AuthorizationCode",
            "customerKey", customerKey,
            "code", code
        );
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            return new ResponseEntity<>(response.getBody(), response.getStatusCode());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

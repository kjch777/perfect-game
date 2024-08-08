package base.ball.controller;


import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;



@RestController
@RequestMapping("/billing")
public class BillingController {

    @Value("${apiSecretKey}")
    private String apiSecretKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final Map<String, String> billingKeyMap = new ConcurrentHashMap<>();

    private String encodeSecretKey(String secretKey) {
        return "Basic " + new String(Base64.getEncoder().encode((secretKey + ":").getBytes()));
    }

    @PostMapping("/issue-billing-key")
    public ResponseEntity<?> issueBillingKey(@RequestBody Map<String, String> requestBody) {
        String url = "https://api.tosspayments.com/v1/billing/authorizations/issue";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", encodeSecretKey(apiSecretKey));
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            billingKeyMap.put(requestBody.get("customerKey"), response.getBody().get("billingKey").toString());
            return new ResponseEntity<>(response.getBody(), response.getStatusCode());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/confirm-billing")
    public ResponseEntity<?> confirmBilling(@RequestBody Map<String, String> requestBody) {
        String billingKey = billingKeyMap.get(requestBody.get("customerKey"));
        String url = "https://api.tosspayments.com/v1/billing/" + billingKey;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", encodeSecretKey(apiSecretKey));
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            return new ResponseEntity<>(response.getBody(), response.getStatusCode());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

package base.ball.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RequestMapping("/api")
@RestController
public class NaverAPIController {

	@Value("${naver.client-id}")
	private String clientId;

	@Value("${naver.client-secret}")
	private String clientSecret;

	@Value("${naver.redirect-uri}")
	private String redirectUri;

	@Value("${naver.state}") 
	private String state;
	
	@GetMapping("/naverLogin")
	public String naverLogin() {
		String api_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectUri + "&state=" + state;
		return "<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>";
	}


	@GetMapping("/callback")
	public  ResponseEntity<String> callback(@RequestParam("code") String code, @RequestParam("state") String state) {
        String apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=" + redirectUri + "&code=" + code + "&state=" + state;
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(apiURL, String.class);
		System.out.println("응답결과 : " + response);
		
		String accessToken = getToken(response);
		
		//여기서 응답에 대한 결과를 전달 -> 나중에 프로젝트 합칠 때 지울 주소
		String redirectUrl = "http://localhost:3000/signup/naver?access_token=" + accessToken;
		HttpHeaders header = new HttpHeaders();
		header.add("Location", redirectUrl);
		return new ResponseEntity<>(header,HttpStatus.FOUND);
	}
	
	private String getToken(String res) {
		ObjectMapper om = new ObjectMapper();
		JsonNode jsonNode;
		try {
			jsonNode = om.readTree(res);
			return jsonNode.get("access_token").asText();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	@GetMapping("/signup/naver")
	public ResponseEntity<String> getUserInfo(@RequestParam("access_token") String accessToken) {
		String apiURL = "https://openapi.naver.com/v1/nid/me";
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		headers.set("Accept", "application/json");
		
		HttpEntity<String> entity = new HttpEntity<>(headers);

		System.out.println("Entity : " + entity);
		
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> res = restTemplate.exchange(apiURL, HttpMethod.GET, entity, String.class);
		
		System.out.println("Response Status Code : " + res.getStatusCode());
		System.out.println("Response Headers : " + res.getHeaders());
		System.out.println("Response Body : " + res.getBody());
		
		if(!res.getStatusCode().is2xxSuccessful()) {
			System.err.println("fail Status code : " + res.getStatusCode());
		}
		
		return res;
	}
}
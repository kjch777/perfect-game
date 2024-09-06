
package base.ball.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/board/files/**")
                .addResourceLocations("C:/Users/user1/Desktop/final-perfect-game/baseball-backend/build/resources/main/static/board/files/");
    }
    
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//      registry.addMapping("/**")
//      .allowedOrigins("http://localhost:3000") /** 3000 ▶ 9090 **/
//      .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//      .allowedHeaders("*")
//      .allowCredentials(true);
//    }

}
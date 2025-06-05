package com.corelink.api_gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("hello-api", r -> r
                        .path("/hello-api/**")  // Note o /** para pegar todos os subpaths
                        .filters(f -> f.stripPrefix(1))  // Remove o prefixo hello-api
                        .uri("lb://hello-api")
                )
                .build();
    }
}
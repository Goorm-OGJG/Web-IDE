package com.ogjg.back.container.controller;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.config.security.jwt.JwtUserDetails;
import com.ogjg.back.container.dto.response.ContainersResponse;
import com.ogjg.back.container.service.ContainerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/main/containers")
@RequiredArgsConstructor
public class MainController {

    private final ContainerService containerService;

    @GetMapping("")
    public ApiResponse<?> getContainers(@RequestParam("search") String query,
                                        @AuthenticationPrincipal JwtUserDetails userDetails) {
        List<ContainersResponse> containersResponses = containerService.searchContainers(query, userDetails.getEmail());
        return new ApiResponse<>(ErrorCode.SUCCESS, containersResponses);
    }

    @PutMapping("/{containerId}/private")
    public ApiResponse<?> updatePrivateStatus(@PathVariable Long containerId,
                                              @AuthenticationPrincipal JwtUserDetails userDetails) {
        boolean isPrivate = containerService.updatePrivateStatus(containerId, userDetails.getEmail());
        return new ApiResponse<>(ErrorCode.SUCCESS, new HashMap<>(
                Map.of("containerId", containerId,
                        "isPrivate", isPrivate)));
    }

    @PutMapping("/{containerId}/info")
    public ApiResponse<?> updateContainerInfo(@PathVariable Long containerId,
                                              @RequestBody Map<String, String> requestMap,
                                              @AuthenticationPrincipal JwtUserDetails userDetails) {
        containerService.updateContainerInfo(containerId, requestMap.get("containerInfo"), userDetails.getEmail());
        return new ApiResponse<>(ErrorCode.SUCCESS, new HashMap<>(
                Map.of("containerId", containerId,
                        "containerInfo", requestMap.get("containerInfo"))));
    }

    @PutMapping("/{containerId}/pin")
    public ApiResponse<?> updateContainerInfo(@PathVariable Long containerId,
                                              @AuthenticationPrincipal JwtUserDetails userDetails) {
        boolean isPinned = containerService.updatePinStatus(containerId, userDetails.getEmail());
        return new ApiResponse<>(ErrorCode.SUCCESS, new HashMap<>(
                Map.of("containerId", containerId,
                        "pinned", isPinned)));
    }
}

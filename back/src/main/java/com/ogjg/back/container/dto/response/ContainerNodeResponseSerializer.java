package com.ogjg.back.container.dto.response;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class ContainerNodeResponseSerializer extends JsonSerializer<ContainerNodeResponse> {

    @Override
    public void serialize(ContainerNodeResponse value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();

        gen.writeStringField("key", value.getKey());
        gen.writeStringField("title", value.getTitle());

        // children 필드 값의 조건에 따라 직렬화 로직 변경
        if (!isFile(value.getKey())) {
            gen.writeFieldName("children");
            gen.writeStartArray();
            for (ContainerNodeResponse child : value.getChildren()) {
                gen.writeObject(child);
            }
            gen.writeEndArray();
        }

        gen.writeEndObject();
    }

    private static boolean isFile(String key) {
        String[] split = key.split("/");
        return split[split.length-1].contains(".");
    }
}


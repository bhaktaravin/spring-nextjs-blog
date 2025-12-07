package blog.demo;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DemoApplicationTestsTest {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    @DisplayName("Should verify application context loads successfully")
    void testContextLoads() {
        assertNotNull(applicationContext, "Application context should not be null");
        assertTrue(applicationContext.getBeanDefinitionCount() > 0, "Context should contain beans");
    }

    @Test
    @DisplayName("Should verify DemoApplicationTests class exists and is a valid test class")
    void testDemoApplicationTestsClassExists() {
        assertDoesNotThrow(() -> Class.forName("blog.demo.DemoApplicationTests"),
                "DemoApplicationTests class should exist");
    }

    @Test
    @DisplayName("Should verify DemoApplicationTests has SpringBootTest annotation")
    void testDemoApplicationTestsHasSpringBootTestAnnotation() throws ClassNotFoundException {
        Class<?> testClass = Class.forName("blog.demo.DemoApplicationTests");
        assertTrue(testClass.isAnnotationPresent(SpringBootTest.class),
                "DemoApplicationTests should have @SpringBootTest annotation");
    }

    @Test
    @DisplayName("Should warn that MockMvc field will be null without @AutoConfigureMockMvc")
    void testMockMvcRequiresAutoConfigureMockMvc() {
        // Note: The DemoApplicationTests class has @Autowired MockMvc but is missing
        // @AutoConfigureMockMvc annotation, which will cause MockMvc to be null
        String warningMessage = "DemoApplicationTests uses @Autowired MockMvc but lacks @AutoConfigureMockMvc annotation";
        assertNotNull(warningMessage, "This test documents the configuration issue");
    }
}
package blog.demo.repositories;

import org.springframework.stereotype.Repository;

import blog.demo.models.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Repository
@EnableJpaRepositories(basePackages = "blog.demo.repositories")
public interface PostRepository extends JpaRepository<Post, Long> {
    
}

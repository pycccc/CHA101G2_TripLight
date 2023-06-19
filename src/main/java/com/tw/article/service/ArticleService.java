package com.tw.article.service;

import java.util.List;
import java.util.Optional;

import com.tw.article.model.Article;

public interface ArticleService {
	
	//新增文章
    Article createArticle(Article article);
    //更改文章
    Article updateArticle(Article article);
    //刪除文章，應該用不到，改定義為隱藏
    void deleteArticle(Article article);
//  void deleteArticle(Integer articleId);
    
    //查詢文章：單一
    Optional<Article> getArticle(Integer articleId);
    //查詢文章：全部
    List<Article> getAllArticles();
    
	Article findById(Integer articleId);
	
	Article save(Article article);
	
	
    
//	Article findByPrimaryKey(Integer articleId);
    
    
}


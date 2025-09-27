package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Transaction;
import com.jharkhand.tourism.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
    List<Transaction> findByUserId(Long userId);
    List<Transaction> findByStatus(Transaction.Status status);
    List<Transaction> findByTransactionType(Transaction.TransactionType transactionType);
    List<Transaction> findByBlockchainTxId(String blockchainTxId);
}


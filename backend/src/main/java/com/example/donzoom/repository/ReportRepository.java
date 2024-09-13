package com.example.donzoom.repository;

import com.example.donzoom.entity.News;
import com.example.donzoom.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

}

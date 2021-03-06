package com.ssafy.ssapilogue.core.repository;

import com.ssafy.ssapilogue.core.domain.BugReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BugReportRepository extends JpaRepository<BugReport, Long> {
    List<BugReport> findAllByProjectIdOrderByIdDesc(Long projectId);
    Integer countAllByProjectIdAndIsSolvedTrue(Long projectId);
    Integer countAllByProjectIdAndIsSolvedFalse(Long projectId);
}

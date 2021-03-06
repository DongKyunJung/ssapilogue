package com.ssafy.ssapilogue.api.service;

import com.ssafy.ssapilogue.api.dto.request.CreateBugReportCommentReqDto;
import com.ssafy.ssapilogue.api.exception.CustomException;
import com.ssafy.ssapilogue.api.exception.ErrorCode;
import com.ssafy.ssapilogue.core.domain.BugReport;
import com.ssafy.ssapilogue.core.domain.BugReportComment;
import com.ssafy.ssapilogue.core.domain.User;
import com.ssafy.ssapilogue.core.repository.BugReportCommentRepository;
import com.ssafy.ssapilogue.core.repository.BugReportRepository;
import com.ssafy.ssapilogue.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class BugReportCommentServiceImpl implements BugReportCommentService{

    private final UserRepository userRepository;

    private final BugReportRepository bugReportRepository;

    private final BugReportCommentRepository bugReportCommentRepository;

    @Override
    public Long createBugReportComment(Long bugId, String userEmail, CreateBugReportCommentReqDto createBugReportCommentReqDto) {
        BugReport bugReport = bugReportRepository.findById(bugId)
                .orElseThrow(() -> new CustomException(ErrorCode.BUGREPORT_NOT_FOUND));

        User user = userRepository.findByEmail(userEmail);

        BugReportComment bugReportComment = BugReportComment.builder()
                .bugReport(bugReport)
                .user(user)
                .content(createBugReportCommentReqDto.getContent())
                .build();

        BugReportComment saveBugReportComment = bugReportCommentRepository.save(bugReportComment);
        return saveBugReportComment.getId();
    }

    @Override
    public void deleteBugReportComment(Long bugCoId) {
        bugReportCommentRepository.deleteById(bugCoId);
    }
}

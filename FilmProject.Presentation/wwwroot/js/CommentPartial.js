﻿$(function(){
    $(".like-button").click(function () {
        let commentIdValue = $(this).parent().data("itemid");
        refreshCommentLike();

        var commentLikeModel = {
            CommentId: commentIdValue,
            userId: "0d161a0c-d0ce-414a-8bc6-02926d70d560"
        };
        console.log(commentLikeModel);
        var model = JSON.stringify(commentLikeModel);
        $.ajax({
            url: '/CommentLike/ChangeCommentLikeStatue',
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            data: model,
            success: function (response) {
                console.log("Listeme ekleme başarılı");
                refreshCommentLike();
            },
            error: function (xhr, status, error) {
                alertify.error(xhr.responseText);
            }
        });

      

  
    })
    refreshCommentLike();

    function refreshCommentLike() {
        let comments = $(".comment-like-item")
        comments.each(function () {
            let commentLikeSection = $(this);
            let commentLikeId = ($(this).data("itemid"));
            $.get('/CommentLike/IsCommentLiked', { commentId: commentLikeId }, function (data, textStatus, jqXHR) {
                let commentLikeStatue = data;
                console.log(commentLikeId + "   " +data)
                if (commentLikeStatue == true) {
                    commentLikeSection.find("i").addClass("like-button--active");
                } else {
                    console.log("HEYYO")
                    commentLikeSection.find("i").removeClass("like-button--active");
                }
                //console.log(commentLikeStatue);
            });

            console.log($(this))
        })
    }






});
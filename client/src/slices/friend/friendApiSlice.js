// friendApiSlice.js
import { apiSlice } from "../apiSlice";

const FRIENDS_URL = "/api/friend-invitation";

export const friendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendFriendInvitation: builder.mutation({
      query: (data) => ({
        url: `${FRIENDS_URL}/invite`,
        method: "POST",
        body: data,
      }),
      //   async onQueryStarted(data, { dispatch, queryFulfilled }) {
      //     try {
      //       await queryFulfilled;
      //       //   dispatch(openAlertMessage('Invitation has been sent!'));
      //       handleShowAlert(dispatch, "success", "Invitation has been sent!");
      //     } catch (err) {
      //       //   dispatch(openAlertMessage(err?.error?.data || 'Error sending invitation.'));
      //       handleShowAlert(
      //         dispatch,
      //         "error",
      //         err?.error?.data || "Error sending invitation."
      //       );
      //     }
      //   },
    }),
    // acceptFriendInvitation: builder.mutation({
    //   query: (data) => ({
    //     url: "/accept-invitation",
    //     method: "POST",
    //     body: data,
    //   }),
    //   async onQueryStarted(data, { dispatch, queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //       //   dispatch(openAlertMessage('Invitation accepted!'));
    //       handleShowAlert(dispatch, "success", "Invitation accepted!");
    //     } catch (err) {
    //       //   dispatch(openAlertMessage(err?.error?.data || 'Error accepting invitation.'));
    //       handleShowAlert(
    //         dispatch,
    //         "error",
    //         err?.error?.data || "Error accepting invitation."
    //       );
    //     }
    //   },
    // }),
    // rejectFriendInvitation: builder.mutation({
    //   query: (data) => ({
    //     url: "/reject-invitation",
    //     method: "POST",
    //     body: data,
    //   }),
    //   async onQueryStarted(data, { dispatch, queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //       //   dispatch(openAlertMessage('Invitation rejected!'));
    //       handleShowAlert(dispatch, "success", "Invitation rejected!");
    //     } catch (err) {
    //       //   dispatch(openAlertMessage(err?.error?.data || 'Error rejecting invitation.'));
    //       handleShowAlert(
    //         dispatch,
    //         "error",
    //         err?.error?.data || "Error rejecting invitation."
    //       );
    //     }
    //   },
    // }),
  }),
});

export const {
  useSendFriendInvitationMutation,
  //   useAcceptFriendInvitationMutation,
  //   useRejectFriendInvitationMutation,
} = friendApiSlice;

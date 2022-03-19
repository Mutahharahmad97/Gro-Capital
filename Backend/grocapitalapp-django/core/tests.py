from django.test import TestCase

# Create your tests here.

# Testing comment



# UPDATE PASSWORD

# model = User

# old_password = serializers.CharField(required=True)
# new_password = serializers.CharField(required=True)

# def update(self, request, *args, **kwargs):
    # email_sender_service()
    # self.object = self.get_object()
    # serializer = self.get_serializer(data=request.data)

    # if serializer.is_valid():
    #     if not self.object.check_password(serializer.data.get("old_password")):
    #         return Response({"message": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)
    #     self.object.set_password(serializer.data.get("new_password"))
    #     self.object.save()
    #     response = {
    #         'status': 'success',
    #         'code': status.HTTP_200_OK,
    #         'message': 'Password updated successfully',
    #         'data': []
    #     }
    #     return Response(response)

    # response = {'message': ['old_password or new_password missing']}
    # return Response("bad request")
from django.contrib.auth.models import User
from .models import Post
from rest_framework import status
from rest_framework.test import APITestCase


class PostListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='tester', password='password1')

    def test_can_list_posts(self):
        """
        Ensure we can view all objects
        """
        tester = User.objects.get(username='tester')
        self.client.force_login(tester)
        Post.objects.create(owner=tester, title='title one', location='Paris')
        response = self.client.get('/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_post(self):
        """
        Ensure logged in user can create a new Post object and view object.
        """
        self.client.login(username='tester', password='password1')
        response = self.client.post('/posts/', {'title': 'title one'})
        count = Post.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_logged_in_user_can_create_post(self):
        response = self.client.post('/posts/', {'title': 'title one'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class PostDetailViewTests(APITestCase):
    def setUp(self):
        tester = User.objects.create_user(
            username='tester', password='password1')
        tester2 = User.objects.create_user(
            username='tester2', password='password2')
        Post.objects.create(
            owner=tester, title='title one', location='Madri',
            content='Visit the Warner Park in Madri'
        )
        Post.objects.create(
            owner=tester2, title='title two', location='Berlin',
            content='Visit the Mall of Berlin'
        )

    def test_can_retrieve_post_using_valid_id(self):
        """
        Ensure logged in user can retrieve post using valid id
        """
        response = self.client.get('/posts/1/')
        self.assertEqual(response.data['title'], 'title one')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cant_retrieve_post_using_invalid_id(self):
        """
        Ensure logged in user cannot access a invalid id
        """
        response = self.client.get('/posts/12345/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_update_own_post(self):
        """
        Ensure owner can update his own post
        """
        tester = User.objects.get(username='tester')
        self.client.force_login(tester)
        response = self.client.put(
            '/posts/1/', {'title': 'a new title', 'location': 'Barcelona'})
        post = Post.objects.filter(pk=1).first()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(post.title, 'a new title')
        self.assertEqual(post.location, 'Barcelona')

    def test_user_cant_update_another_users_post(self):
        """
        Ensure logged in user cannot update another users post
        """
        self.client.login(username='tester', password='password1')
        response = self.client.put('/posts/2/', {'title': 'a new title'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

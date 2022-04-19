using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly DoisRPnetContext ctx;

        public PostRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public Post Create(Post post)
        {
            ctx.Posts.Add(post);
            ctx.SaveChangesAsync();

            return post;
        }

        public void Delete(Post post)
        {
            List<Like> LikesPost = ctx.Likes.AsNoTracking().Where(L => L.IdPost == post.IdPost).ToList();
            List<Comment> CommentsPost = ctx.Comments.AsNoTracking().Where(C => C.IdPost == post.IdPost).ToList();
            foreach (var item in LikesPost)
            {
                ctx.Likes.Remove(item);
            }
            foreach (var item in CommentsPost)
            {
                ctx.Comments.Remove(item);
            }
            ctx.Posts.Remove(post);
            ctx.SaveChangesAsync();
        }

        public List<Post> GetByUser(int userId)
        {
            return ctx.Posts.Select(post => new Post()
            {
                IdPost = post.IdPost,
                Title = post.Title,
                PostDescription = post.PostDescription,
                PostImage = post.PostImage,
                DataPost = post.DataPost,
                IdPlayerNavigation = new Player()
                {
                    IdEmployeeNavigation = new Employee()
                    {
                        IdUserNavigation = new UserName()
                        {
                            IdUser = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                            UserName1 = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                            PhotoUser = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                        },
                        IdOfficeNavigation = new Office()
                        {
                            IdOffice = post.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                            TitleOffice = post.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                        }
                    }
                },
                Likes = post.Likes.Select(Like => new Like()
                {
                    IdLikes = Like.IdLikes,
                    IdPlayerNavigation = new Player()
                    {
                        IdEmployeeNavigation = new Employee()
                        {
                            IdUserNavigation = new UserName()
                            {
                                IdUser = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                                UserName1 = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                                PhotoUser = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                            },
                            IdOfficeNavigation = new Office()
                            {
                                IdOffice = Like.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                                TitleOffice = Like.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                            }
                        }
                    },
                }).ToList(),
                Comments = post.Comments.Select(Comment => new Comment() {
                    IdComment = Comment.IdComment,
                    Title = Comment.Title,
                    CommentDescription = Comment.CommentDescription,
                    IdPlayerNavigation = new Player()
                    {
                        IdEmployeeNavigation = new Employee()
                        {
                            IdUserNavigation = new UserName()
                            {
                                IdUser = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                                UserName1 = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                                PhotoUser = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                            },
                            IdOfficeNavigation = new Office()
                            {
                                IdOffice = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                                TitleOffice = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                            }
                        }
                    },

                }).ToList(),
            }).Where(P => P.IdPlayerNavigation.IdEmployeeNavigation.IdUser == userId).ToList();
        }

        public List<Post> GetHighlightedPosts()
        {
            return ctx.Posts.OrderBy(post => post.DataPost).Take(12).OrderBy(post => post.Likes.Count).Take(4).Select(post => new Post()
            {
                IdPost = post.IdPost,
                Title = post.Title,
                PostDescription = post.PostDescription,
                PostImage = post.PostImage,
                DataPost = post.DataPost,
                IdPlayerNavigation = new Player()
                {
                    IdEmployeeNavigation = new Employee()
                    {
                        IdUserNavigation = new UserName()
                        {
                            IdUser = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                            UserName1 = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                            PhotoUser = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                        },
                        IdOfficeNavigation = new Office()
                        {
                            IdOffice = post.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                            TitleOffice = post.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                        }
                    }
                },
                Likes = post.Likes.Select(Like => new Like()
                {
                    IdLikes = Like.IdLikes,
                    IdPlayerNavigation = new Player()
                    {
                        IdEmployeeNavigation = new Employee()
                        {
                            IdUserNavigation = new UserName()
                            {
                                IdUser = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                                UserName1 = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                                PhotoUser = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                            },
                            IdOfficeNavigation = new Office()
                            {
                                IdOffice = Like.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                                TitleOffice = Like.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                            }
                        }
                    },
                }).ToList(),
                Comments = post.Comments.Select(Comment => new Comment()
                {
                    IdComment = Comment.IdComment,
                    Title = Comment.Title,
                    CommentDescription = Comment.CommentDescription,
                    IdPlayerNavigation = new Player()
                    {
                        IdEmployeeNavigation = new Employee()
                        {
                            IdUserNavigation = new UserName()
                            {
                                IdUser = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                                UserName1 = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                                PhotoUser = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                            },
                            IdOfficeNavigation = new Office()
                            {
                                IdOffice = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                                TitleOffice = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                            }
                        }
                    },

                }).ToList(),
            }).ToList(); 
        }

        public IEnumerable<Post> ReadAll()
        {
            return ctx.Posts.Select(post => new Post()
            {
                IdPost = post.IdPost,
                Title = post.Title,
                PostDescription = post.PostDescription,
                PostImage = post.PostImage,
                DataPost = post.DataPost,
                IdPlayerNavigation = new Player()
                {
                    IdEmployeeNavigation = new Employee()
                    {
                        IdUserNavigation = new UserName()
                        {
                            IdUser = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                            UserName1 = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                            PhotoUser = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                        },
                        IdOfficeNavigation = new Office()
                        {
                            IdOffice = post.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                            TitleOffice = post.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                        }
                    }
                },
                Likes = post.Likes.Select(Like => new Like()
                {
                    IdLikes = Like.IdLikes,
                    IdPlayerNavigation = new Player()
                    {
                        IdEmployeeNavigation = new Employee()
                        {
                            IdUserNavigation = new UserName()
                            {
                                IdUser = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                                UserName1 = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                                PhotoUser = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                            },
                            IdOfficeNavigation = new Office()
                            {
                                IdOffice = Like.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                                TitleOffice = Like.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                            }
                        }
                    },
                }).ToList(),
                Comments = post.Comments.Select(Comment => new Comment()
                {
                    IdComment = Comment.IdComment,
                    Title = Comment.Title,
                    CommentDescription = Comment.CommentDescription,
                    IdPlayerNavigation = new Player()
                    {
                        IdEmployeeNavigation = new Employee()
                        {
                            IdUserNavigation = new UserName()
                            {
                                IdUser = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                                UserName1 = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                                PhotoUser = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                            },
                            IdOfficeNavigation = new Office()
                            {
                                IdOffice = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                                TitleOffice = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                            }
                        }
                    },

                }).ToList(),
            }).ToList();
        }

        public Post SearchByID(int id)
        {
            return ctx.Posts.Select(post => new Post()
            {
                IdPost = post.IdPost,
                Title = post.Title,
                PostDescription = post.PostDescription,
                PostImage = post.PostImage,
                DataPost = post.DataPost,
                IdPlayerNavigation = new Player()
                {
                    IdEmployeeNavigation = new Employee()
                    {
                        IdUserNavigation = new UserName()
                        {
                            IdUser = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                            UserName1 = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                            PhotoUser = post.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                        },
                        IdOfficeNavigation = new Office()
                        {
                            IdOffice = post.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                            TitleOffice = post.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                        }
                    }
                },
                Likes = post.Likes.Select(Like => new Like()
                {
                    IdLikes = Like.IdLikes,
                    IdPlayerNavigation = new Player()
                    {
                        IdEmployeeNavigation = new Employee()
                        {
                            IdUserNavigation = new UserName()
                            {
                                IdUser = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                                UserName1 = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                                PhotoUser = Like.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                            },
                            IdOfficeNavigation = new Office()
                            {
                                IdOffice = Like.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                                TitleOffice = Like.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                            }
                        }
                    },
                }).ToList(),
                Comments = post.Comments.Select(Comment => new Comment()
                {
                    IdComment = Comment.IdComment,
                    Title = Comment.Title,
                    CommentDescription = Comment.CommentDescription,
                    IdPlayerNavigation = new Player()
                    {
                        IdEmployeeNavigation = new Employee()
                        {
                            IdUserNavigation = new UserName()
                            {
                                IdUser = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.IdUser,
                                UserName1 = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.UserName1,
                                PhotoUser = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdUserNavigation.PhotoUser
                            },
                            IdOfficeNavigation = new Office()
                            {
                                IdOffice = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.IdOffice,
                                TitleOffice = Comment.IdPlayerNavigation.IdEmployeeNavigation.IdOfficeNavigation.TitleOffice
                            }
                        }
                    },

                }).ToList(),
            }).ToList().FirstOrDefault(post => post.IdPost == id);
        }

        public Post Update(Post post)
        {
            ctx.Entry(post).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return post;
        }
    }
}

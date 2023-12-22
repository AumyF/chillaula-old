table "User"  {
  schema = schema.public
  column "id" {
    type = uuid
  }
  column "name" {
    type = text
  }
  primary_key {
    columns = [column.id]
  }
}

table "Bookmark" {
  schema = schema.public
  column "id" {
    type = serial
  }
  column "createdAt" {
    null    = false
    type    = timestamp(3)
    default = sql("CURRENT_TIMESTAMP")
  }
  column "title" {
    type = text
  }
  column "url" {
    type = text
  }
  column "collectionId" {
    type = integer
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "Bookmark_collectionId_fkey" {
    columns     = [column.collectionId]
    ref_columns = [table.ResuCollection.column.id]
    on_update   = CASCADE
    on_delete   = RESTRICT
  }
  index "Bookmark_collectionId_key" {
    unique  = true
    columns = [column.collectionId]
  }
  index "Bookmark_url_key" {
    unique  = true
    columns = [column.url]
  }
}
table "Resu" {
  schema = schema.public
  column "id" {
    type = serial
  }
  column "createdAt" {
    null    = false
    type    = timestamp(3)
    default = sql("CURRENT_TIMESTAMP")
  }
  column "authorId" {
    type = uuid
  }
  column "content" {
    type = text
  }
  column "collectionId" {
    null = true
    type = integer
  }
  column "quoteId" {
    null = true
    type = integer
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "Resu_collectionId_fkey" {
    columns     = [column.collectionId]
    ref_columns = [table.ResuCollection.column.id]
    on_update   = CASCADE
    on_delete   = SET_NULL
  }
  foreign_key "Resu_quoteId_fkey" {
    columns     = [column.quoteId]
    ref_columns = [table.Resu.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  foreign_key "Resu_author_fk" {
    columns = [column.authorId]
    ref_columns = [table.User.column.id]
  }
  index "authorId" {
    unique = true
    columns =  [column.authorId]
  }
}
table "ResuCollection" {
  schema = schema.public
  column "id" {
    type = serial
  }
  column "createdAt" {
    null    = false
    type    = timestamp(3)
    default = sql("CURRENT_TIMESTAMP")
  }
  primary_key {
    columns = [column.id]
  }
}
table "Tag" {
  schema = schema.public
  column "id" {
    type = serial
  }
  column "name" {
    type = text
  }
  column "parentId" {
    null = true
    type = integer
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "Tag_parentId_fkey" {
    columns     = [column.parentId]
    ref_columns = [table.Tag.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  index "Tag_parentId_name_key" {
    unique  = true
    columns = [column.parentId, column.name]
  }
}
table "TagAttach" {
  schema = schema.public
  column "id" {
    type = serial
  }
  column "tagId" {
    type = integer
  }
  column "bookmarkId" {
    null = true
    type = integer
  }
  column "threadId" {
    null = true
    type = integer
  }
  column "resuId" {
    null = true
    type = integer
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "TagAttach_bookmarkId_fkey" {
    columns     = [column.bookmarkId]
    ref_columns = [table.Bookmark.column.id]
    on_update   = CASCADE
    on_delete   = SET_NULL
  }
  foreign_key "TagAttach_resuId_fkey" {
    columns     = [column.resuId]
    ref_columns = [table.Resu.column.id]
    on_update   = CASCADE
    on_delete   = SET_NULL
  }
  foreign_key "TagAttach_tagId_fkey" {
    columns     = [column.tagId]
    ref_columns = [table.Tag.column.id]
    on_update   = CASCADE
    on_delete   = RESTRICT
  }
  foreign_key "TagAttach_threadId_fkey" {
    columns     = [column.threadId]
    ref_columns = [table.Thread.column.id]
    on_update   = CASCADE
    on_delete   = SET_NULL
  }
  index "TagAttach_tagId_threadId_bookmarkId_resuId_key" {
    unique  = true
    columns = [column.tagId, column.threadId, column.bookmarkId, column.resuId]
  }
}
table "Thread" {
  schema = schema.public
  column "id" {
    type = serial
  }
  column "createdAt" {
    null    = false
    type    = timestamp(3)
    default = sql("CURRENT_TIMESTAMP")
  }
  column "title" {
    type = text
  }
  column "collectionId" {
    type = integer
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "Thread_collectionId_fkey" {
    columns     = [column.collectionId]
    ref_columns = [table.ResuCollection.column.id]
    on_update   = CASCADE
    on_delete   = RESTRICT
  }
  index "Thread_collectionId_key" {
    unique  = true
    columns = [column.collectionId]
  }
}
schema "public" {
  comment = "standard public schema"
}

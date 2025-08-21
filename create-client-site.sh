#!/bin/bash

# クライアントサイト自動生成スクリプト
# 使用方法: ./create-client-site.sh "クライアント名" "サイトタイトル"

CLIENT_NAME=$1
SITE_TITLE=$2
REPO_NAME="${CLIENT_NAME,,}-portfolio"

echo "🎯 クライアントサイトを作成中..."
echo "クライアント名: $CLIENT_NAME"
echo "サイトタイトル: $SITE_TITLE"
echo "リポジトリ名: $REPO_NAME"

# 1. 新しいディレクトリを作成
mkdir "../$REPO_NAME"
cd "../$REPO_NAME"

# 2. テンプレートファイルをコピー
cp -r ../my-portfolio/* .

# 3. 設定ファイルを更新
sed -i '' "s/山元 来輝 (Raiki Yamamoto)/$CLIENT_NAME/g" index.html
sed -i '' "s/Profile & Philosophy/$SITE_TITLE/g" index.html

# 4. Gitリポジトリを初期化
git init
git add .
git commit -m "Initial commit: $CLIENT_NAME portfolio"

echo "✅ サイト作成完了！"
echo "次のステップ:"
echo "1. GitHubでリポジトリを作成: $REPO_NAME"
echo "2. git remote add origin https://github.com/raiki2528/$REPO_NAME.git"
echo "3. git push -u origin main"
echo "4. GitHub Pagesを有効化" 
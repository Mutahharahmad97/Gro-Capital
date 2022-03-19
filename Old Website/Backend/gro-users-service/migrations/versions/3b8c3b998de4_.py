"""empty message

Revision ID: 3b8c3b998de4
Revises: 0811448ecdd8
Create Date: 2020-03-24 17:05:37.717565

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '3b8c3b998de4'
down_revision = '0811448ecdd8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('companies', 'rating')
    op.drop_column('companies', 'last_time_rating_fetched')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('companies', sa.Column('last_time_rating_fetched', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('companies', sa.Column('rating', sa.VARCHAR(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###

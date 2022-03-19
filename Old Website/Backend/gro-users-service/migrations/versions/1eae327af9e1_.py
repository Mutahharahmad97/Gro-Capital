"""empty message

Revision ID: 1eae327af9e1
Revises: eb42f33b43d0
Create Date: 2020-03-13 09:38:35.386100

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1eae327af9e1'
down_revision = 'eb42f33b43d0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('companies', sa.Column('last_time_rating_fetched', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('companies', 'last_time_rating_fetched')
    # ### end Alembic commands ###

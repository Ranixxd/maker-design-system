import ThumbCard from './ThumbCard';
import IconButton from '../IconButton/IconButton';

export default {
  title: 'Components/ThumbCard',
  component: ThumbCard,
  parameters: {
    docs: {
      description: {
        component: `썸네일 카드(2026-10-27, 덕꾸 앱 이어서 편집 카드).

- 정사각 그림 칸(기본 120), 둥글기 \`radius-2xl\`, 가장자리 \`border-default\` 가는 선
- 그림 칸 안은 **부르는 쪽이 채운다**(테마는 하단탭 아이콘 더미, 배경은 배경화면을 가운데 기준으로 꽉 채워 자른 것). 바탕색도 그림이 정한다
- 아래 한 줄에 \`caption\`(날짜, \`label-sm\` default)과 끝의 \`trailing\`([⋯]). 이름은 두지 않는다
- 그림 칸이 단추다. 낭독기 이름은 \`label\`로 준다
- 가로로 늘어놓을 때는 Carousel에 담는다`,
      },
    },
  },
};

export const Default = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
      {['오늘', '어제', '10월 20일'].map((d) => (
        <ThumbCard key={d} caption={d} label={`${d} 테마 이어서 편집`}
          trailing={<IconButton icon="MoreHorizontal" size="sm" variant="neutral-weak" aria-label="더보기" />}>
          <span style={{ position: 'absolute', inset: 0, background: 'var(--color-bg-secondary)' }} />
        </ThumbCard>
      ))}
    </div>
  ),
};

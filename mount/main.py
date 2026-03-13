import pygame

# Initialize Pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
SCREEN = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Mount: Simple Platformer")

# Colors
RED = (255, 0, 0)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Game settings
FPS = 60
GRAVITY = 0.5
PLAYER_JUMP_VELOCITY = -12

# Player class
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface([50, 50])
        self.image.fill(RED)
        self.rect = self.image.get_rect()
        self.rect.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT - 100) # Start above ground
        self.y_velocity = 0
        self.on_ground = False

    def jump(self):
        if self.on_ground:
            self.y_velocity = PLAYER_JUMP_VELOCITY
            self.on_ground = False

    def update(self):
        # Apply gravity
        self.y_velocity += GRAVITY
        self.rect.y += self.y_velocity

        # Simple collision with ground
        # We'll define a 'ground' rectangle for clarity
        ground_y = SCREEN_HEIGHT - 50 # Where the ground starts
        if self.rect.bottom >= ground_y:
            self.rect.bottom = ground_y
            self.y_velocity = 0
            self.on_ground = True

    def draw(self, screen):
        screen.blit(self.image, self.rect)

# Game loop
def game():
    player = Player()
    clock = pygame.time.Clock()
    running = True

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    player.jump()

        # Update game elements
        player.update()

        # Drawing
        SCREEN.fill(BLACK) # Clear the screen

        # Draw ground (a simple rectangle for visual reference)
        ground_rect = pygame.Rect(0, SCREEN_HEIGHT - 50, SCREEN_WIDTH, 50)
        pygame.draw.rect(SCREEN, WHITE, ground_rect)

        player.draw(SCREEN)

        # Update display
        pygame.display.flip()

        # Cap the frame rate
        clock.tick(FPS)

    pygame.quit()

if __name__ == '__main__':
    game()
